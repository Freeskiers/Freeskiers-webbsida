import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  setNestedPathValue,
  CMS_DRAFT_KEY,
  CMS_PREVIEW_ACTIVE_KEY,
  useCmsContent,
  useCmsPreview,
  CmsPreviewProvider,
} from "./CmsPreviewContext";
import { getCmsContent } from "../lib/cmsContent";

describe("CmsPreviewContext logic", () => {
  it("exports correct storage keys", () => {
    expect(CMS_DRAFT_KEY).toBe("freeskiers_cms_draft");
    expect(CMS_PREVIEW_ACTIVE_KEY).toBe("freeskiers_cms_preview_active");
  });

  describe("setNestedPathValue", () => {
    it("updates top-level field", () => {
      const base = { foo: "bar" };
      const res = setNestedPathValue(base, "foo", "baz");
      expect(res.foo).toBe("baz");
      expect(base.foo).toBe("bar"); // immutable
    });

    it("updates nested field without mutating parent", () => {
      const base = {
        topBanner: { enabled: false, text: "Original" },
        hero: { title: "Title" },
      };
      const res = setNestedPathValue(base, "topBanner.text", "Updated Text");
      expect(res.topBanner.text).toBe("Updated Text");
      expect(res.topBanner.enabled).toBe(false);
      expect(res.hero.title).toBe("Title");
      expect(base.topBanner.text).toBe("Original");
    });

    it("creates intermediate objects if path does not exist", () => {
      const base = {};
      const res = setNestedPathValue(base, "groups.helgskidskola.price", "3 500 kr");
      expect(res.groups.helgskidskola.price).toBe("3 500 kr");
    });

    it("handles array updates", () => {
      const base = { calendarEvents: [{ id: "1", title: "Old" }] };
      const updatedList = [{ id: "1", title: "New" }, { id: "2", title: "Second" }];
      const res = setNestedPathValue(base, "calendarEvents", updatedList);
      expect(res.calendarEvents.length).toBe(2);
      expect(res.calendarEvents[0].title).toBe("New");
    });
  });

  describe("React hooks rendering", () => {
    it("renders consumer with baseline content inside provider", () => {
      let capturedTitle = "";
      function TestConsumer() {
        const content = useCmsContent();
        capturedTitle = content.hero.title;
        return React.createElement("div", null, content.hero.title);
      }

      renderToString(
        React.createElement(
          CmsPreviewProvider,
          null,
          React.createElement(TestConsumer, null)
        )
      );

      const baseline = getCmsContent();
      expect(capturedTitle).toBe(baseline.hero.title);
    });

    it("supports self-referencing .content property on useCmsContent()", () => {
      let capturedViaContent = "";
      function TestConsumer() {
        const { content } = useCmsContent();
        capturedViaContent = content.hero.title;
        return React.createElement("div", null, content.hero.title);
      }

      renderToString(
        React.createElement(
          CmsPreviewProvider,
          null,
          React.createElement(TestConsumer, null)
        )
      );

      const baseline = getCmsContent();
      expect(capturedViaContent).toBe(baseline.hero.title);
    });

    it("provides preview context with expected interface", () => {
      let capturedContext: any = null;
      function TestConsumer() {
        const preview = useCmsPreview();
        capturedContext = preview;
        return React.createElement("div", null, String(preview.isPreviewActive));
      }

      renderToString(
        React.createElement(
          CmsPreviewProvider,
          null,
          React.createElement(TestConsumer, null)
        )
      );

      expect(capturedContext).toBeDefined();
      expect(capturedContext.isPreviewActive).toBe(false);
      expect(typeof capturedContext.activatePreview).toBe("function");
      expect(typeof capturedContext.exitPreview).toBe("function");
      expect(typeof capturedContext.clearDraft).toBe("function");
      expect(typeof capturedContext.updateDraftField).toBe("function");
      expect(typeof capturedContext.setDraftContent).toBe("function");
      expect(typeof capturedContext.publishDraft).toBe("function");
    });
  });
});

