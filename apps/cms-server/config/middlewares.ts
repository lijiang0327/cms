export default ({env}) => {
  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    'strapi::cors',
    {
      name: 'strapi::cors',
      config: {
        enable: true,
        headers: env.array('ACCESS_CONTROL_ALLOW_HEADERS'),
        origin: env.array('ACCESS_CONTROL_ALLOW_ORIGIN'),
      }
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ]
};
