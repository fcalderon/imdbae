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

    Repo.delete_all(Match)
    Repo.delete_all(Usermovie)
    Repo.delete_all(User)

    u1 = Repo.insert!(%User{email: "anna@gmail.com", name: "anna", password_hash: p})
    u2 = Repo.insert!(%User{email: "betty@gmail.com", name: "betty", password_hash: p})
    u3 = Repo.insert!(%User{email: "candace@gmail.com", name: "candace", password_hash: p})
    u4 = Repo.insert!(%User{email: "devin@gmail.com", name: "devin", password_hash: p})

    uM1 = Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 284054, title: "Black Panther"})
    uM2 = Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 27205, title: "Inception"})
    uM3 = Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 640, title: "Catch Me if You Can"})
    uM4 = Repo.insert!(%Usermovie{user_id: u1.id, movie_id: 244786, title: "Whiplash"})

    u2M1 = Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 284054, title: "Black Panther"})
    u2M2 = Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 27205, title: "Inception"})
    u2M3 = Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 640, title: "Catch Me if You Can"})
    u2M4 = Repo.insert!(%Usermovie{user_id: u2.id, movie_id: 244786, title: "Whiplash"})

    Repo.insert!(
      %Match{
        first_user_id: u1.id,
        second_user_id: u2.id,
        matched_on_first_usermovie_id: uM1.id,
        matched_on_second_usermovie_id: u2M1.id,
        matched_on_movie_id: uM1.movie_id,
        matched_on_movie_title: uM1.title
      }
    )

    Repo.insert!(
      %Match{
        first_user_id: u1.id,
        second_user_id: u2.id,
        matched_on_first_usermovie_id: uM2.id,
        matched_on_second_usermovie_id: u2M2.id,
        matched_on_movie_id: uM2.movie_id,
        matched_on_movie_title: uM2.title
      }
    )

    Repo.insert!(
      %Match{
        first_user_id: u1.id,
        second_user_id: u2.id,
        matched_on_first_usermovie_id: uM3.id,
        matched_on_second_usermovie_id: u2M3.id,
        matched_on_movie_id: uM3.movie_id,
        matched_on_movie_title: uM3.title
      }
    )

  end
end

Seeds.run
