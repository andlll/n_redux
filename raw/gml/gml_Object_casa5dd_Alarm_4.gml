/// gml_Object_casa5dd_Alarm_4
// locals: __b__
action_set_relative(0);
action_set_alarm(1600, 4);
__b__ = action_if_number(617, 0, 2);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(hap, pop, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(ele, 0, 2);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            __b__ = action_if_variable(ava, 0, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold25, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 1, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold26, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 2, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold27, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 3, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold28, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 4, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold29, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 5, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold30, 0, 0);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
