// gml_Object_fujilogo_Create_0  locals=2 args=0 len=176
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
00000034: bf 0x21103E8
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: push.imm.e 2
00000054: conv.i.v
00000058: call action_sprite_transform(argc=4)
00000060: popz
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: push.imm.e 711
00000078: conv.i.v
0000007C: call action_create_object(argc=3)
00000084: popz
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 120
00000094: conv.i.v
00000098: call action_set_alarm(argc=2)
000000A0: popz
000000A4: push.imm.e 0
000000A8: pop.v.i going