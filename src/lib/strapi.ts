export const getHomePage = async (locale?: string): Promise<HomeProps> => {
  const search = new URLSearchParams({
    "populate[0]": "Sections.Background",
    "populate[1]": "Sections.Photos",
  });

  if (locale) {
    search.append("locale", locale);
  }

  const response = await fetch(
    `${process.env.STRAPI_HOST}/api/home-page?${search}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );

  return response.json();
};

export const getAllPagePaths = async () => {
  const response = await fetch(`${process.env.STRAPI_HOST}/api/pages`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  });

  const json: { data: Array<{ attributes: { Slug: string } }> } =
    await response.json();

  return json.data.map((page) => page.attributes.Slug);
};

export const getPageBySlug = async (
  slug: string,
  locale = "en"
): Promise<PagesProps> => {
  const search = new URLSearchParams({
    "filter[Slug][$eq]": slug,
    "populate[0]": "Sections",
    "populate[1]": "Sections.Background",
    "populate[2]": "Sections.Photos",
    "pagination[limit]": "1",
  });

  if (locale) {
    search.append("locale", locale);
  }

  const response = await fetch(
    `${process.env.STRAPI_HOST}/api/pages?${search}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );

  return response.json();
};

export interface PagesProps {
  data: Array<Page>;
}

export interface Page {
  id: number;
  attributes: {
    Title: string;
    Sections: Array<RichText | Copy | Franchise | Gallery>;
  };
}

export interface HomeProps {
  data: {
    id: number;
    attributes: {
      Title: string;
      Sections: Array<RichText | Copy | Franchise | Gallery>;
    };
  };
}

export interface RichText {
  id: string;
  Title: string;
  Description: string;
  __component: "common.rich-text";
}

export interface Copy {
  id: string;
  Title: string;
  Description: string;
  __component: "common.copy";
}

export interface Franchise {
  id: string;
  Title: string;
  Description: string;
  ctaTitle: string;
  ctaLink?: string;
  __component: "common.franchise";
  Background: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface Gallery {
  id: string;
  Photos: {
    data: Array<{
      id: string;
      attributes: {
        url: string;
        width: number;
        height: number;
      };
    }>;
  };
  __component: "common.gallery";
}
