import { useEffect } from "react";

export default function useDocumentMetadata(
  title: string,
  description?: string,
  robots?: string,
) {
  useEffect(() => {
    document.title = title;

    if (description !== undefined) {
      const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

      if (metaDescription) {
        metaDescription.content = description;
      }
    }

    const existingRobotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');

    if (robots === undefined) {
      existingRobotsMeta?.remove();
      return;
    }

    const robotsMeta = existingRobotsMeta ?? document.createElement("meta");

    if (!existingRobotsMeta) {
      robotsMeta.name = "robots";
      document.head.append(robotsMeta);
    }

    robotsMeta.content = robots;

    return () => {
      robotsMeta.remove();
    };
  }, [description, robots, title]);
}
