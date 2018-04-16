#Attr: Microblog by Nat Tuck

defmodule ImdbaeWeb.SessionController do
  use ImdbaeWeb, :controller

  alias Imdbae.Accounts

  #TODO: change redirect
  def create(conn, %{"email" => email, "password" => password}) do
    user = Accounts.get_and_auth_user(email, password)
    if user do
      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Welcome back #{user.name}")
      |> redirect(to: page_path(conn, :index))
    else
      conn
      |> put_flash(:error, "Can't create session")
      |> redirect(to: page_path(conn, :index))
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out")
    |> redirect(to: page_path(conn, :index))
  end
end

