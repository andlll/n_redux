/// gml_Object_casa3_Alarm_4
// locals: __b__
action_set_relative(0);
action_set_alarm(3000, 4);
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
                action_create_object(sold13, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 1, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold14, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 2, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold15, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 3, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold16, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 4, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold17, 0, 0);
                action_set_relative(0);
            }
            __b__ = action_if_variable(ava, 5, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(sold18, 0, 0);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
