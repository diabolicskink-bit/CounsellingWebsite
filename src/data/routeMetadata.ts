import metadata from "./routeMetadata.json";

export type RouteMetadata = {
  title: string;
  description: string;
  robots?: string;
};

export type SiteMetadata = {
  name: string;
  defaultOrigin: string;
  themeColor: string;
  backgroundColor: string;
  organization: {
    email: string;
    logo: string;
    logoWidth: number;
    logoHeight: number;
    description: string;
    sameAs: string[];
  };
  person: {
    name: string;
    jobTitle: string;
    url: string;
    image: string;
    description: string;
    sameAs: string[];
    credentials: Array<{
      name: string;
      credentialCategory: string;
      url?: string;
      recognizedBy: {
        type: "Organization" | "CollegeOrUniversity";
        name: string;
        url: string;
      };
    }>;
  };
  service: {
    name: string;
    serviceType: string;
    url: string;
    description: string;
    audience: string;
    areaServed: string;
  };
  socialImage: string;
  socialImageAlt: string;
};

export type PublicRoutePath = keyof typeof metadata.routes;

type RecognizedByType = SiteMetadata["person"]["credentials"][number]["recognizedBy"]["type"];

function getRecognizedByType(value: string): RecognizedByType {
  if (value === "Organization" || value === "CollegeOrUniversity") {
    return value;
  }

  throw new Error(`Unsupported credential recognizing organization type: ${value}`);
}

export const siteMetadata: SiteMetadata = {
  ...metadata.site,
  person: {
    ...metadata.site.person,
    credentials: metadata.site.person.credentials.map((credential) => ({
      ...credential,
      recognizedBy: {
        ...credential.recognizedBy,
        type: getRecognizedByType(credential.recognizedBy.type),
      },
    })),
  },
};
export const routeMetadata = metadata.routes satisfies Record<string, RouteMetadata>;

export function getRouteMetadata(path: PublicRoutePath): RouteMetadata {
  return routeMetadata[path];
}
