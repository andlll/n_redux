/// gml_Object_soldbio_Mouse_10
action_set_relative(1);
action_effect(1, 0, -50, 1, 65535, 0);
with (r12) {
    biotech = biotech + 1;
}
action_kill_object();
action_set_relative(0);
