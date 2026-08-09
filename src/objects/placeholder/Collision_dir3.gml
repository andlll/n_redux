/// gml_Object_placeholder_Collision_602
// locals: __b__
action_set_relative(0);
making = 2;
with (dir3) {
    __b__ = action_if_variable(arm, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 6, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (other.id) {
            action_set_relative(1);
            action_create_object(mon_bil, -1559, 680);
            action_set_relative(0);
        }
        action_set_relative(1);
        action_create_object(mon_bil, -1559, 680);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(impa4r, 99, 57);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(dirdel, 99, 57);
        action_set_relative(0);
        with (r12) {
            action_set_relative(1);
            mon = mon + -6000;
            action_set_relative(0);
        }
        with (scroller2) {
            goer = 1;
        }
        with (placeholder) {
            ult = 0;
        }
        action_kill_object();
        with (dir1) {
            action_kill_object();
        }
        with (dir2) {
            action_kill_object();
        }
        with (dir3) {
            action_kill_object();
        }
        with (dir4) {
            action_kill_object();
        }
    }
    with (r12) {
        __b__ = action_if_variable(selec, 70, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (other.id) {
            action_set_relative(1);
            action_create_object(mon_bbil, -1559, 680);
            action_set_relative(0);
        }
        action_set_relative(1);
        action_create_object(mon_bbil, -1559, 680);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(IMPAMEDIA_R, 99, 57);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(dirdel, 99, 57);
        action_set_relative(0);
        with (r12) {
            action_set_relative(1);
            mon = mon + -35000;
            action_set_relative(0);
        }
        with (scroller2) {
            goer = 1;
        }
        with (placeholder) {
            ult = 0;
        }
        action_kill_object();
        with (dir1) {
            action_kill_object();
        }
        with (dir2) {
            action_kill_object();
        }
        with (dir3) {
            action_kill_object();
        }
        with (dir4) {
            action_kill_object();
        }
    }
}
action_set_relative(0);
