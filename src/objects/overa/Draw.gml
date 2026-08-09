/// gml_Object_overa_Draw_0
action_font(gotham_giga, 0);
action_color(16777215);
action_draw_text("GAME OVER", view_xview[0] + 70, view_yview[0] + 380);
action_draw_text("You ran out of", view_xview[0] + 32, view_yview[0] + 560);
action_draw_text("fuel in", view_xview[0] + 79, view_yview[0] + 650);
with (r12) {
    action_draw_variable(time, view_xview[0] + 341, view_yview[0] + 650);
}
