class CreateChallenges < ActiveRecord::Migration[6.1]
  def change
    create_table :challenges do |t|
      t.string :challenge_name
      t.string :video
      t.string :challenge_description
      t.integer :user_id
      t.string :category

      t.timestamps
    end
  end
end
