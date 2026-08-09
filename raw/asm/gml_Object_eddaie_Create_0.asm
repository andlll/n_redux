// gml_Object_eddaie_Create_0  locals=2 args=0 len=156
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20D5414
00000038: call action_kill_object(argc=0)
00000040: popz
00000044: push.d 0.5
00000050: conv.d.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 433
00000060: conv.i.v
00000064: call action_sprite_set(argc=3)
0000006C: popz
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 7
00000084: conv.i.v
00000088: push.imm.e 7
0000008C: conv.i.v
00000090: call action_sprite_transform(argc=4)
00000098: popz