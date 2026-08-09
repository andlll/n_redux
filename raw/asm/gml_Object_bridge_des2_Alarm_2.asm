// gml_Object_bridge_des2_Alarm_2  locals=2 args=0 len=208
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 518
00000014: conv.i.v
00000018: call action_sprite_set(argc=3)
00000020: popz
00000024: push.imm.e 169
00000028: pushenv 0x20CC424
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 447
00000040: conv.i.v
00000044: call action_sprite_set(argc=3)
0000004C: popz
00000050: popenv 0x40CC400
00000054: push.imm.e 170
00000058: pushenv 0x20CC454
0000005C: push.imm.e 1
00000060: conv.i.v
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 446
00000070: conv.i.v
00000074: call action_sprite_set(argc=3)
0000007C: popz
00000080: popenv 0x40CC430
00000084: push.imm.e 10
00000088: conv.i.v
0000008C: call action_if_dice(argc=1)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20CC4A4
000000AC: push.imm.e 2170
000000B0: conv.i.v
000000B4: push.imm.e 4500
000000B8: conv.i.v
000000BC: push.imm.e 19
000000C0: conv.i.v
000000C4: call action_create_object(argc=3)
000000CC: popz