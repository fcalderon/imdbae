defmodule ImdbaeWeb.Router do
  use ImdbaeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :get_current_user
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_user_token
  end

  def get_current_user(conn, _params) do
    user_id = get_session(conn, :user_id)
    user = Imdbae.Accounts.get_user(user_id || -1)
    assign(conn, :current_user, user)
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :authorize_user
  end

  defp put_user_token(conn, _params) do
    user_id = get_session(conn, :user_id)
    user_token = Phoenix.Token.sign(conn, "user_id", user_id)
    assign(conn, :user_id, user_token)
  end

  scope "/", ImdbaeWeb do
    pipe_through :browser # Use the default browser stack
    get "/", PageController, :index
    get "/chat", PageController, :chat
    get "/movies", PageController, :movies
    get "/login", PageController, :movies
    get "/signUp", PageController, :movies

    resources "/users", UserController

    post "/session", SessionController, :create
    delete "/session", SessionController, :delete

  end

  # Other scopes may use custom stacks.
   scope "/api/v1", ImdbaeWeb do
     pipe_through :api
     resources "/matches", MatchController, except: [:new, :edit]
     resources "/users", UserJsonController, except: [:new, :edit]
     resources "/auth", AuthController
   end

  def authorize_user(conn, params) do
    authorization_header_value = get_req_header(conn, "authorization")

    if (length(authorization_header_value) > 0) do
      signingKey = Application.get_env(:imdbae, :app_salt)

      authToken = String.replace(Enum.at(authorization_header_value, 0), "Bearer ", "")

      handle_user_auth(Phoenix.Token.verify(ImdbaeWeb.Endpoint, signingKey, authToken), conn)

    else
      conn
    end
  end

  defp handle_user_auth(result, conn) do
    case result do
      {:ok, user_id } ->
        IO.puts("User authenticated")
        assign(conn, :authenticated_user_id, user_id )
      {:error, reason } ->
        IO.puts("Error authenticating user")
        conn
        |> send_resp(:unauthorized, "Invalid token!")
    end
  end
end
