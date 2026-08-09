// gml_Object_m3cant_Mouse_10  locals=2 args=0 len=172
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: push.imm.e 2
0000000C: conv.i.v
00000010: push.v phase
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x213FF60
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 10
00000044: conv.i.v
00000048: push.v phase
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x213FF60
00000070: push.imm.e 1
00000074: pop.v.i redder
0000007C: push.imm.e -7000
00000080: pop.v.i depth
00000088: push.d 0.4
00000094: conv.d.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: call action_sprite_color(argc=2)
000000A8: popz