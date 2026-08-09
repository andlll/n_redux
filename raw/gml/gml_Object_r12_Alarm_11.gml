/// gml_Object_r12_Alarm_11
// locals: __b__
action_set_alarm(15000, 11);
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
                    __b__ = action_if_number(736, 0, 0);
                    if (__b__) {
                        __b__ = action_if_variable(oil, 1000, 2);
                        if (__b__) {
                            __b__ = action_if_variable(mon, 500, 2);
                            if (__b__) {
                                __b__ = action_if_variable(hap, pop, 2);
                                if (__b__) {
                                    action_save_game("nimsavbac");
                                }
                            }
                        }
                    } else {
                        __b__ = action_if_variable(oil, 1000, 2);
                        if (__b__) {
                            __b__ = action_if_variable(mon, 500, 2);
                            if (__b__) {
                                __b__ = action_if_variable(hap, pop, 2);
                                if (__b__) {
                                    action_save_game("nimsav_easbac");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
