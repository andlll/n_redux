// gml_Object_reversi_KeyPress_8  locals=2 args=0 len=688
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 149
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21EE408
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 148
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21EE408
00000070: push.imm.e 617
00000074: pushenv 0x21EE374
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v menoo
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x21EE374
000000B0: b 0x21EE37C
000000B4: popenv 0x41EE338
000000B8: b 0x21EE380
000000BC: popenv 0x1DEE37C
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x21EE3D4
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 717
000000E4: conv.i.v
000000E8: call action_create_object(argc=3)
000000F0: popz
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.imm.e 30
00000100: conv.i.v
00000104: call action_set_alarm(argc=2)
0000010C: popz
00000110: b 0x21EE408
00000114: push.imm.e 141
00000118: pushenv 0x21EE3EC
0000011C: push.v obj140.x
00000124: pop.v.v x
0000012C: popenv 0x41EE3DC
00000130: push.imm.e 617
00000134: pushenv 0x21EE404
00000138: push.imm.e 0
0000013C: pop.v.i menoo
00000144: popenv 0x41EE3F8
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 148
0000015C: conv.i.v
00000160: call action_if_number(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: not.b.d
00000180: bf 0x21EE4A4
00000184: push.imm.e 148
00000188: pushenv 0x21EE458
0000018C: call action_kill_object(argc=0)
00000194: popz
00000198: popenv 0x41EE44C
0000019C: push.imm.e 151
000001A0: pushenv 0x21EE470
000001A4: call action_kill_object(argc=0)
000001AC: popz
000001B0: popenv 0x41EE464
000001B4: push.imm.e 153
000001B8: pushenv 0x21EE488
000001BC: call action_kill_object(argc=0)
000001C4: popz
000001C8: popenv 0x41EE47C
000001CC: push.imm.e 152
000001D0: pushenv 0x21EE4A0
000001D4: call action_kill_object(argc=0)
000001DC: popz
000001E0: popenv 0x41EE494
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 0
000001F0: conv.i.v
000001F4: push.imm.e 149
000001F8: conv.i.v
000001FC: call action_if_number(argc=3)
00000204: pop.v.v local.__b__
0000020C: push.local.v local.__b__
00000214: conv.v.b
00000218: not.b.d
0000021C: bf 0x21EE570
00000220: push.imm.e 643
00000224: pushenv 0x21EE4F4
00000228: call action_kill_object(argc=0)
00000230: popz
00000234: popenv 0x41EE4E8
00000238: push.imm.e 149
0000023C: pushenv 0x21EE50C
00000240: call action_kill_object(argc=0)
00000248: popz
0000024C: popenv 0x41EE500
00000250: push.imm.e 696
00000254: pushenv 0x21EE524
00000258: call action_kill_object(argc=0)
00000260: popz
00000264: popenv 0x41EE518
00000268: push.imm.e 698
0000026C: pushenv 0x21EE53C
00000270: call action_kill_object(argc=0)
00000278: popz
0000027C: popenv 0x41EE530
00000280: push.imm.e 700
00000284: pushenv 0x21EE554
00000288: call action_kill_object(argc=0)
00000290: popz
00000294: popenv 0x41EE548
00000298: push.imm.e 702
0000029C: pushenv 0x21EE56C
000002A0: call action_kill_object(argc=0)
000002A8: popz
000002AC: popenv 0x41EE560