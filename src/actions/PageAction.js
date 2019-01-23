export const GET_PHOTOS_REQUEST = "GET_PHOTOS_REQUEST";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAIL = "GET_PHOTOS_FAIL";

let photosArr = [];
let cashed = false;

function makeYearPhotos(photos, selectedYear) {
  let createdYear,
    yearPhoto = [];

  photos.forEach(item => {
    createdYear = new Date(item.date * 1000).getFullYear();
    console.log("createdYear", createdYear);
    if (createdYear === selectedYear) yearPhoto.push(item);
  });

  yearPhoto.sort((a, b) => b.likes.count - a.likes.count);
  console.log(yearPhoto);
  return yearPhoto;
}

function getMorePhotos(offset, count, year, dispatch) {
  // eslint-disable-next-line no-undef
  VK.Api.call(
    "photos.getAll",
    { extended: 1, count: count, offset: offset, v: "5.80" },
    r => {
      try {
        console.log(r);
        photosArr = photosArr.concat(r.response.items);
        console.log("photosArr", photosArr);
        let photos = makeYearPhotos(photosArr, year);
        cashed = true;
        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: photos
        });
      } catch (e) {
        dispatch({
          type: GET_PHOTOS_FAIL,
          error: true,
          payload: new Error(e)
        });
      }
    }
  );
}
export function getPhotos(year) {
  return dispatch => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year
    });

    if (cashed) {
      let photos = makeYearPhotos(photosArr, year);
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos
      });
    } else {
      getMorePhotos(0, 200, year, dispatch);
    }
  };
}
