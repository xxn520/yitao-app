# Read more about app structure at http://docs.appgyver.com

module.exports =

# See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "首页"
      id: "index"
      location: "yitao#index" # Supersonic module#view type navigation
    }
    {
      title: "发现"
      id: "explore"
      location: "yitao#explore"
    }
    {
      title: "消息"
      id: "message"
      location: "yitao#message"
    }
    {
      title: "我的"
      id: "mine"
      location: "yitao#mine"
    }
  ]

# rootView:
#   location: "example#getting-started"

  preloads: [
    {
      id: "login"
      location: "yitao#login"
    }
    {
      id: "mine"
      location: "yitao#mine"
    }
  ]

# drawers:
#   left:
#     id: "leftDrawer"
#     location: "example#drawer"
#     showOnAppLoad: false
#   options:
#     animation: "swingingDoor"
#
# initialView:
#   id: "initialView"
#   location: "example#initial-view"
