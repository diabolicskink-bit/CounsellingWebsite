import { useEffect } from "react";

export default function useDocumentMetadata(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description === undefined) {
      return;
    }

    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = description;
    }
  }, [description, title]);
}
