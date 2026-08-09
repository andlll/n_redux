// gml_Object_thunderclap_Step_0  locals=2 args=0 len=140
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v over
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x213612C
00000038: push.imm.e 2
0000003C: pop.v.i over
00000044: push.d 0.5
00000050: conv.d.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 572
00000060: conv.i.v
00000064: call action_sprite_set(argc=3)
0000006C: popz
00000070: push.imm.e 1
00000074: conv.i.v
00000078: push.imm.e 120
0000007C: conv.i.v
00000080: call action_set_alarm(argc=2)
00000088: popz