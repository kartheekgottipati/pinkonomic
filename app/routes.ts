import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("game", "routes/pinkdrop.tsx"),
    route("teleportapp", "routes/teleportapp.tsx"),
    route("pinkpaper", "routes/pinkpaper.tsx"),
    ...prefix("pinkiverse", [
        index("routes/pinkiverse/home.tsx"),
        route("/pinkdrop", "routes/pinkiverse/pinkdrop.tsx"),
        route("/pinkness-overdrive", "routes/pinkiverse/pinkracing.tsx"),
        route("/pinkbullet", "routes/pinkiverse/pinkbullet.tsx"),
        route("/pink-a-mole", "routes/pinkiverse/pinkamole.tsx"),
      ]),
] satisfies RouteConfig;
