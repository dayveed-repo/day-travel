export const getApiUrl = (type) => {
  const listBoundaryUrl = `https://travel-advisor.p.rapidapi.com/${type.toLowerCase()}/list-in-boundary`;
  return listBoundaryUrl;
};

export const getListBoundaryOptions = (ne, sw) => {
  if (ne && sw)
    return {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "X-RapidAPI-Key": "a0fb0a64d1msh33864f3a0f344b3p1c8024jsn857cda525720",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };
  return {
    params: {
      bl_latitude: "11.847676",
      tr_latitude: "12.838442",
      bl_longitude: "109.095887",
      tr_longitude: "109.149359",
    },
    headers: {
      "X-RapidAPI-Key": "a0fb0a64d1msh33864f3a0f344b3p1c8024jsn857cda525720",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
};
