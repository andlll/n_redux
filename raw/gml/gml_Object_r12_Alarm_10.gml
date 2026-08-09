/// gml_Object_r12_Alarm_10
// locals: __b__
action_set_alarm(1800, 10);
__b__ = action_if_number(617, 0, 2);
if (__b__) {
    __b__ = action_if_number(717, 0, 0);
    if (__b__) {
        __b__ = action_if_variable(exiting, 0, 0);
        if (__b__) {
            __b__ = action_if_number(7, 0, 0);
            if (__b__) {
                __b__ = action_if_number(8, 0, 0);
                if (__b__) {
                    __b__ = action_if_number(9, 0, 0);
                    if (__b__) {
                        __b__ = action_if_number(10, 0, 0);
                        if (__b__) {
                            __b__ = action_if_number(11, 0, 0);
                            if (__b__) {
                                __b__ = action_if_number(736, 0, 0);
                                if (__b__) {
                                    action_save_game("nimsav");
                                } else {
                                    action_save_game("nimsav_eas");
                                }
                                action_create_object(savvvvvco, 0, 0);
                            }
                        }
                    }
                }
            }
        }
    }
}
