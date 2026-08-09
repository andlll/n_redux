// gml_Object_bridge_des2_Alarm_1  locals=1 args=0 len=196
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 3600
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.d 0.2
00000028: conv.d.v
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 445
00000038: conv.i.v
0000003C: call action_sprite_set(argc=3)
00000044: popz
00000048: push.imm.e 169
0000004C: pushenv 0x20CC518
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 518
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: popenv 0x40CC4F4
00000078: push.imm.e 170
0000007C: pushenv 0x20CC548
00000080: push.imm.e 1
00000084: conv.i.v
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 518
00000094: conv.i.v
00000098: call action_sprite_set(argc=3)
000000A0: popz
000000A4: popenv 0x40CC524
000000A8: push.imm.e 3
000000AC: conv.i.v
000000B0: push.imm.e 30
000000B4: conv.i.v
000000B8: call action_set_alarm(argc=2)
000000C0: popz