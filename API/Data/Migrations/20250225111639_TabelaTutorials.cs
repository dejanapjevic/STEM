using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class TabelaTutorials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TutorialId",
                table: "Videos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Tutorials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tutorials", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Videos_TutorialId",
                table: "Videos",
                column: "TutorialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_Tutorials_TutorialId",
                table: "Videos",
                column: "TutorialId",
                principalTable: "Tutorials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Videos_Tutorials_TutorialId",
                table: "Videos");

            migrationBuilder.DropTable(
                name: "Tutorials");

            migrationBuilder.DropIndex(
                name: "IX_Videos_TutorialId",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "TutorialId",
                table: "Videos");
        }
    }
}
