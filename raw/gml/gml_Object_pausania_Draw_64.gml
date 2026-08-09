/// gml_Object_pausania_Draw_64
draw_sprite(spr1, 0, 0, 0);
draw_set_alpha(0.5);
draw_rectangle_colour(0, 0, 4000, 4000, 16777215, 16777215, 16777215, 16777215, 0);
draw_set_alpha(1);
draw_set_halign(1);
draw_set_valign(1);
draw_set_font(gotham_giga);
draw_text(view_wport[0] / 2, view_hport[0] / 2, "GAME PAUSED");
