const domain = "your domain name";

export interface Topic {
  topic_id: number;
  title: string;
  language: string,
  framework: string,
  thumbnail: string,
  number_of_subtopics: number
}

export interface ResponseJSONObject {
  items?: Topic[];
  message?: string;
}

export interface Subtopic {
  id: number;
  title: string;
  video_url: string,
  topic_id: number,
  duration: string,
}


export function fetchTopics(): Promise<ResponseJSONObject> {
  const responseJSONObject: ResponseJSONObject = {};

  return fetch(`${domain}/t_topics`)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((jsonArray: Topic[]) => {
          responseJSONObject.items = jsonArray;
          return responseJSONObject;
        });
      } else {
        responseJSONObject.message = "Failed to Fetch Items";
        return responseJSONObject;
      }
    })
    .catch(() => {
      responseJSONObject.message = "Failed to Fetch Items";
      return responseJSONObject;
    });
}

export interface SubTopicItem {
  message?: string;
  subtopics?: Subtopic[]

}


export function fetchItems(topicId: number) {
  const responseJSONObject: SubTopicItem = {};
  let url;

  if (topicId !== null && topicId !== undefined) {
    url = `${domain}/codingtools?topic_id=${topicId}`;
  } else {
    url = `${domain}/codingtool`;
  }

  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json().then(jsonArray => {
          responseJSONObject.subtopics = jsonArray;
          return responseJSONObject;
        });
      } else {
        return response.text().then(errorMsg => {
          responseJSONObject.message = "Failed to Fetch Items";
          return responseJSONObject;
        });
      }
    })
    .catch(() => {
      responseJSONObject.message = "Failed to Fetch Items";
      return responseJSONObject;
    });
}

export function searchTopics(query: string): Promise<ResponseJSONObject> {
  const responseJSONObject: ResponseJSONObject = {};

  return fetch(`${domain}/api/search?q=${encodeURIComponent(query)}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          responseJSONObject.items = json.items;
          return responseJSONObject;
        });
      } else {
        responseJSONObject.message = `Failed to fetch items (status: ${response.status})`;
        return responseJSONObject;
      }
    })
    .catch(() => {
      responseJSONObject.message = "Something went wrong while searching.";
      return responseJSONObject;
    });
}

