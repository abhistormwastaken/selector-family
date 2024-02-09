import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  // now we will do async data query to get atoms using atomFamily from the backend
  // but it can't be async until we use selectorFamily (just like selector in case of atom)

  // selectorFamily returns a function which returns a function
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // just to show the loading state
        // we might want to setup a loader here next as the process of fetching from backend can take time
        const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
        return res.data.todo;
      },
    })
});