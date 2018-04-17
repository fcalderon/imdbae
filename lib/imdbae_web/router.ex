defmodule ImdbaeWeb.Router do
  use ImdbaeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :get_current_user
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  def get_current_user(conn, _params) do
    user_id = get_session(conn, :user_id)
    user = Imdbae.Accounts.get_user(user_id || -1)
    assign(conn, :current_user, user)
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ImdbaeWeb do
    pipe_through :browser # Use the default browser stack
    get "/", PageController, :index
    get "/chat", PageController, :chat

    resources "/users", UserController

    post "/session", SessionController, :create
    delete "/session", SessionController, :delete

  end

  # Other scopes may use custom stacks.
   scope "/api/v1", ImdbaeWeb do
     pipe_through :api
     resources "/matches", MatchController, except: [:new, :edit]
   end
end
