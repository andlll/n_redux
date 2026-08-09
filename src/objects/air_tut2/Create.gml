/// gml_Object_air_tut2_Create_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    view_xview[0] = view_xview[0] + 500;
}
instance_create(x + 300, y + 200, air_tut1);
instance_create(x - 300, y + 220, air_tut1);
instance_create(0, 0, tut_sf);
instance_create(0, -1128, tut_sf);
instance_create(2000, -1128, tut_sf);
instance_create(0, 1128, tut_sf);
instance_create(2000, 1128, tut_sf);
instance_create(2000, 0, tut_sf);
alarm[0] = 330;
alarm[1] = 240;
action_set_relative(0);
action_set_motion(30, 1);
action_set_relative(1);
with (tutorial_square) {
    action_kill_object();
}
with (freccia_tutorial) {
    action_kill_object();
}
with (tutorial_thumb) {
    action_kill_object();
}
action_set_relative(0);
