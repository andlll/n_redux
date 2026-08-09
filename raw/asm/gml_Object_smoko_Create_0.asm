// gml_Object_smoko_Create_0  locals=2 args=0 len=180
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 36
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: call action_if_dice(argc=1)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x21D9850
00000044: push.imm.e 1
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 1345
00000058: conv.i.v
0000005C: call action_sprite_set(argc=3)
00000064: popz
00000068: push.imm.e 2
0000006C: conv.i.v
00000070: call action_if_dice(argc=1)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x21D989C
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.imm.e 1346
000000A4: conv.i.v
000000A8: call action_sprite_set(argc=3)
000000B0: popz