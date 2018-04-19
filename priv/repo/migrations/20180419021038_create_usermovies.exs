defmodule Imdbae.Repo.Migrations.CreateUsermovies do
  use Ecto.Migration

  def change do
    create table(:usermovies) do
      add :title, :string
      add :movie_id, :integer
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:usermovies, [:user_id])
  end
end
