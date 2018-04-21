defmodule Imdbae.Repo.Migrations.CreateUserroom do
  use Ecto.Migration

  def change do
    create table(:userroom) do
      add :user_rooms, :string
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :room_id, references(:rooms, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:userroom, [:user_id])
    create index(:userroom, [:room_id])
    create index(:userroom, [:user_id, :room_id], unique: true)
  end
end
