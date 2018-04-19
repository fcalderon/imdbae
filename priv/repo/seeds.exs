# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Imdbae.Repo.insert!(%Imdbae.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Imdbae.Repo
  alias Imdbae.Accounts.User
  alias Imdbae.Social.Match
  alias Imdbae.Usermovies.Usermovie

  def run do
    p = Comeonin.Argon2.hashpwsalt("thisisnotacommonpassword")

    Repo.delete_all(Usermovie)
    Repo.delete_all(User)

    u1 = Repo.insert!(%User{email: "anna@gmail.com", name: "anna", password_hash: p})
    u2 = Repo.insert!(%User{email: "betty@gmail.com", name: "betty", password_hash: p})
    u3 = Repo.insert!(%User{email: "candace@gmail.com", name: "candace", password_hash: p})
    u4 = Repo.insert!(%User{email: "devin@gmail.com", name: "devin", password_hash: p})

    Repo.delete_all(Match)
    Repo.insert!(%Match{email1: "anna@gmail.com", email2: "betty@gmail.com"})
    Repo.insert!(%Match{email1: "betty@gmail.com", email2: "candace@gmail.com"})
    Repo.insert!(%Match{email1: "anna@gmail.com", email2: "candace@gmail.com"})



    Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 284054, title: "Black Panther"})
    Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 27205, title: "Inception"})
    Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 640, title: "Catch Me if You Can"})
    Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 244786, title: "Whiplash"})

    Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 284054, title: "Black Panther"})
    Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 27205, title: "Inception"})
    Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 640, title: "Catch Me if You Can"})
    Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 244786, title: "Whiplash"})

  end
end

Seeds.run
