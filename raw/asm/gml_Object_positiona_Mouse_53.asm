// gml_Object_positiona_Mouse_53  locals=2 args=0 len=200
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20C0338
00000038: push.imm.e 2
0000003C: conv.i.v
00000040: push.imm.e -1
00000044: push.imm.e 0
00000048: push.v obj0.view_yview[array]
00000050: push.imm.e -1
00000054: push.imm.e 0
00000058: push.v obj0.view_hview[array]
00000060: add.v.v
00000064: push.imm.e 100
00000068: sub.i.v
0000006C: push.builtin.v mouse_y
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20C0338
00000094: push.builtin.v mouse_y
0000009C: push.v desy
000000A4: sub.v.v
000000A8: push.builtin.v mouse_x
000000B0: push.v des
000000B8: sub.v.v
000000BC: call action_move_to(argc=2)
000000C4: popz