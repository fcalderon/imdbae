defmodule Imdbae.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string

    field :password_hash, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    field :pw_tries, :integer
    field :pw_last_try, :utc_datetime

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :password, :password_confirmation])
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/@/)
    |> validate_confirmation(:password) 
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_required([:email, :name, :password_hash])
  end

  #password validation. Attr: Comeonin docs
  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end
  def put_pass_hash(changeset), do: changeset

  def valid_password?(password) when byte_size(password) > 7 do

    #Attr: Passwords pulled from GeekNoob.com
    commonpasswords = ["password", "12345678", "meowmeow", "11111111", 
                       "marlboro", "danielle", "asdfasdf", "trustno1", 
                       "redskins", "airborne", "elephant", "victoria",
                       "monalisa", "cocacola", "baseball", "football", 
                       "internet", "testing123", "godzilla", "explorer", 
                       "williams", "lifehack", "christin", "butthead", 
                       "december", "mountain", "dickhead", "platinum",
                       "brooklyn", "jennifer", "lionking", "pa55word", 
                       "mercedes", "benjamin", "brandon", "superman", 
                       "Rush2112", "jonathan", "garfield", "shithead",
                       "redwings", "startrek", "xxxxxxxx", "michigan", 
                       "88888888", "69696969", "87654321", "nicholas", 
                       "metallic", "scorpion", "jordan23", "21212121",
                       "bigdaddy", "liverpoo", "guinness", "qwertyui", 
                       "michelle", "Midnight", "einstein", "sunshine",
                       "password1"]

    if (Enum.member?(commonpasswords, password)) do
      {:error, "Password is too common"}
    else
      {:ok, password}
    end
  end
  def valid_password?(_), do: {:error, "The password is too short"}

end  
