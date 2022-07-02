/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react-hooks";
import useBreedList from "../useBreedList";

test("gives an empty list with no animal", async () => {
    const { result } = renderHook(() => useBreedList(""))
    const [breedList, status] = result.current;

    expect(breedList).toHaveLength(0);
    expect(status).toBe("unloaded");
});

test("gives back breeds with an animal", async () => {
    const breeds = [
        "Havanese",
        "Bichon Frise",
        "Poodle",
        "Maltese",
        "Golden Retriever",
        "Labrador",
        "Husky"
    ];

    fetch.mockResponseOnce(
        JSON.stringify({
            aniaml: "dog",
            breeds,
        })
    );

    const { result, waitForNextUpdate } = renderHook(() => useBreedList("dog"))

    await waitForNextUpdate();

    const [breedList, status] = result.current;
    expect(status).toBe("loaded");
    expect(breedList).toEqual(breeds);
});


// Testing custom hooks is a bit of a trick because they 
// are inherently tied to the internal workings of React: 
// they can't be called outside of a component. So how we 
// do we get around that? We fake a component!