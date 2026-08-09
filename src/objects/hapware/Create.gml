/// gml_Object_hapware_Create_0
proto1 = window_get_width();
proto2 = window_get_height();
if (proto1 > proto2) {
    global.upp = 0;
} else {
    global.upp = 40;
}
action_sprite_transform(0.62, 0.62, 0, 0);
