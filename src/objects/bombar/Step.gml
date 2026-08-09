/// gml_Object_bombar_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    __b__ = action_if_variable(piro, 0, 0);
    if (__b__) {
        piro = 1;
        action_set_alarm(8, 6);
        action_set_motion(10, 7);
        action_set_alarm(20, 1);
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(esplo, 0, 0);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(rot11, 70, 40);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(rot12, -70, -40);
            action_set_relative(0);
            action_sprite_set(bomb_p1, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(esplo, 0, 0);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(rot21, -70, -40);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(rot22, 70, 40);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(rot23, -170, 100);
            action_set_relative(0);
            action_set_relative(1);
            action_create_object(rot24, -170, 100);
            action_set_relative(0);
            action_sprite_set(bomb_p2, 0, 1);
        }
    }
}
action_set_relative(0);
