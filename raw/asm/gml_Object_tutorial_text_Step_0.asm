// gml_Object_tutorial_text_Step_0  locals=2 args=0 len=196
// locals: arguments, __b__
00000000: push.v obj7.y
00000008: push.imm.e 320
0000000C: add.i.v
00000010: push.v obj7.x
00000018: push.imm.e 90
0000001C: sub.i.v
00000020: call action_move_to(argc=2)
00000028: popz
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.v du
00000044: call action_if_variable(argc=3)
0000004C: pop.v.v local.__b__
00000054: push.local.v local.__b__
0000005C: conv.v.b
00000060: bf 0x21ED428
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 28
00000070: conv.i.v
00000074: push.v num
0000007C: call action_if_variable(argc=3)
00000084: pop.v.v local.__b__
0000008C: push.local.v local.__b__
00000094: conv.v.b
00000098: bf 0x21ED428
0000009C: push.imm.e 1
000000A0: pop.v.i du
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 600
000000B4: conv.i.v
000000B8: call action_set_alarm(argc=2)
000000C0: popz