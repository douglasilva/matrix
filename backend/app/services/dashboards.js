const fetchFixed = () => new Promise((resolve, reject) => {
  try {

    const roomsDetail = [{"title": "Douglas", "url": "https://docs.google.com/document/d/e/2PACX-1vSLOWeZQJCXquyex_PmSOhHuVsBUBAdhIWhL6xxsayT-372noL6jkFOvQ6Q4p0vSlsQMDU51vdx3QtK/pub?embedded=true"},
    {"title": "Educacional", "url": "https://docs.google.com/presentation/d/e/2PACX-1vQufYEPXCV9gYZ1XgYJJoEdft2_aKV8ju8jB5N_LomFySkhzLLTpEdOgVH_SN-B8ggHabBMhD2UbQSb/embed?start=false&loop=false&delayms=3000"}];

    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromEnvironment = (env) => new Promise((resolve, reject) => {
  try {
    const dashboardsData = env.DASHBOARDS_DATA;
    const dashboardsDetail = JSON.parse(dashboardsData);
    resolve(dashboardsDetail);
  } catch (error) {
    
  }
});

const fetchDashboards = () => {
  return dash = fetchFromEnvironment(process.env);

  // if (dash)
  //   return dash;
  // else
  //  return fetchFixed();
};

export default fetchDashboards;
