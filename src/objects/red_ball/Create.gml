/// gml_Object_red_ball_Create_0
action_set_alarm(1, 0);
action_set_alarm(120, 1);
action_move_point(instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y, 50);
