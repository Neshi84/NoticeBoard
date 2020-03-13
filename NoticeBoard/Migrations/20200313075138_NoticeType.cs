using Microsoft.EntityFrameworkCore.Migrations;

namespace NoticeBoard.Migrations
{
    public partial class NoticeType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Notices",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "NoticeTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoticeTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notices_TypeId",
                table: "Notices",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notices_NoticeTypes_TypeId",
                table: "Notices",
                column: "TypeId",
                principalTable: "NoticeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notices_NoticeTypes_TypeId",
                table: "Notices");

            migrationBuilder.DropTable(
                name: "NoticeTypes");

            migrationBuilder.DropIndex(
                name: "IX_Notices_TypeId",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Notices");
        }
    }
}
