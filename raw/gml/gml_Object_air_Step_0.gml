/// gml_Object_air_Step_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    __b__ = action_if_variable(piro, 0, 0);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_create_object(esplo, 0, 0);
            action_set_relative(0);
            piro = 1;
            action_set_relative(1);
            action_set_relative(0);
            action_set_motion(300, 12);
            action_set_relative(1);
            if (col == 0) {
                sprite_index = 259;
            }
            if (col == 1) {
                sprite_index = 256;
            }
            if (col == 2) {
                sprite_index = 258;
            }
            if (col == 3) {
                sprite_index = 257;
            }
            action_set_relative(0);
            desto = 0;
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(30, 1);
            action_set_relative(1);
            action_create_object(smoko_aer, 0, 0);
            action_set_relative(0);
            action_set_alarm(8, 6);
            action_set_relative(1);
        } else {
            action_create_object(esplo, 0, 0);
            action_kill_object();
        }
    }
}
action_set_relative(0);
