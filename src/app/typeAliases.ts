export type Item = {
  id: number;
  text: string;
  url: string;
  children: React.ReactNode;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setText: (text: string) => void;
  setUrl: (text: string) => void;
  isEditing: (state: boolean) => void;
}

export type BookmarkData = {
  id: number;
  text: string;
  url: string;
};

export type MessageSettings = {
  text: string;
  color: string;
};

export type Pagination = {
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export type SearchParams = {
  searchParams: {
    [key: string]: string | string[] | undefined
  };
}

export type CirclePos = {
  x: string;
  y: string;
}
