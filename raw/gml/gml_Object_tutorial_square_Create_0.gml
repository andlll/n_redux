/// gml_Object_tutorial_square_Create_0
action_set_relative(1);
phase = 0;
action_create_object(tutorial_thumb, 0, 130);
action_create_object(freccia_tutorial, 0, 130);
with (r12) {
    action_set_relative(0);
    oil = 9000;
    action_set_relative(1);
}
with (r12) {
    action_set_relative(0);
    mon = 20000;
    action_set_relative(1);
}
tutpar = instance_number(parco);
tutind = instance_number(industria1);
tutrl = instance_number(rocket_launcher);
if (os_type == 4) {
    went = 100;
}
if (os_type == 0) {
    went = 0;
}
action_set_relative(0);
