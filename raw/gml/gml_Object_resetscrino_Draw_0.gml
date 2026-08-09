/// gml_Object_resetscrino_Draw_0
draw_set_alpha(0.7);
draw_rectangle_colour(0, -200, 4000, 4000, 0, 0, 0, 0, 0);
draw_set_alpha(1);
draw_sprite_ext(rescrs, 0, view_wview[0] / 2 + view_xview[0], 200 + global.upp + view_yview[0], global.sca, global.sca, 0, 16777215, 1);
