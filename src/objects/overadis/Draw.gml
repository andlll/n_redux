/// gml_Object_overadis_Draw_0
action_font(gotham_giga, 0);
action_color(16777215);
action_draw_text("GAME OVER", view_xview[0] + 70, view_yview[0] + 380);
action_draw_text("Your city was ", view_xview[0] + 40, view_yview[0] + 560);
action_draw_text("destroyed in", view_xview[0] + 42, view_yview[0] + 650);
with (r12) {
    action_draw_variable(time, view_xview[0] + 341, view_yview[0] + 740);
}
