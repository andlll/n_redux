/// gml_Object_yellow_pro_Create_0
action_set_relative(1);
with (r12) {
    mon = mon + -3;
}
action_set_relative(0);
action_set_alarm(1, 0);
action_set_relative(1);
action_create_object(smoko, 0, 0);
action_set_relative(0);
action_set_alarm(50, 1);
action_set_relative(1);
action_set_relative(0);
action_move_point(instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y, 60);
action_set_relative(1);
action_set_relative(0);
